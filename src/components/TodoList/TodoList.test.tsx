import { render, screen, waitFor } from "@testing-library/react";
import { TodoList } from "./TodoList";

// Mock fetch toàn cục để TẤT CẢ test không gọi API thật
// Dùng globalThis để tránh lỗi TypeScript môi trường DOM
globalThis.fetch = jest.fn()

describe("TodoList Component", () => {

  // Sau mỗi test case, xóa toàn bộ lịch sử mock
  // Tránh việc test sau bị ảnh hưởng bởi mock của test trước
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Hiển thị loading khi đang fetch data", async () => {
    /**
     * mockReturnValue với Promise không resolve
     * → fetch mãi pending
     * → component sẽ luôn ở trạng thái loading
     */
    (fetch as jest.Mock).mockReturnValue(
      new Promise(() => {}) as any
    );

    // Render component
    render(<TodoList />);

    // Ngay sau render phải thấy Loading...
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("Hiển thị 'No result!' khi API trả về danh sách rỗng", async () => {
    /**
     * mockResolvedValue
     * → giả lập fetch thành công
     * → json() trả về object có todos rỗng
     */
    (fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ todos: [] }),
    });

    render(<TodoList />);

    /**
     * waitFor dùng vì:
     * - fetch là async
     * - component re-render sau khi fetch xong
     */
    await waitFor(() => {
      expect(screen.getByText(/No result!/i)).toBeInTheDocument();
    });
  });

  it("Render danh sách todo khi fetch thành công", async () => {
    /**
     * mock API trả về danh sách todos hợp lệ
     */
    (fetch as jest.Mock).mockResolvedValue({
      json: async () => ({
        todos: [
          { id: 1, todo: "Learn React Testing", completed: false, userId: 1 },
          { id: 2, todo: "Write Unit Test", completed: true, userId: 1 },
        ],
      }),
    });

    render(<TodoList />);

    /**
     * findByText:
     * - đợi element xuất hiện trong DOM
     * - phù hợp với dữ liệu render sau async
     */
    expect(
      await screen.findByText("Learn React Testing")
    ).toBeInTheDocument();

    // Todo thứ 2 render cùng lúc nên có thể dùng getByText
    expect(
      screen.getByText("Write Unit Test")
    ).toBeInTheDocument();
  });
});
