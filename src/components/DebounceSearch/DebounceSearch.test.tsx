import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DebounceSearch } from "~/components/DebounceSearch/DebounceSearch";

// Bắt buộc dùng fake timer để control debounce
jest.useFakeTimers();

// Mock fetch global
globalThis.fetch = jest.fn();

describe("DebounceSearch Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Fetch users lần đầu khi component mount", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: async () => [
        { id: 1, name: "Leanne Graham" },
      ],
    });

    render(<DebounceSearch />);

    // Component mount → gọi fetchUsers()
    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users?q="
    );

    // Chờ user render
    expect(
      await screen.findByText("Leanne Graham")
    ).toBeInTheDocument();
  });

  it("Hiển thị loading khi đang fetch", async () => {
    // Giữ fetch pending
    (fetch as jest.Mock).mockReturnValue(
      new Promise(() => {}) as any
    );

    render(<DebounceSearch />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("Debounce search – chỉ fetch sau 500ms", async () => {
    const user = userEvent.setup({ delay: null });

    (fetch as jest.Mock).mockResolvedValue({
      json: async () => [
        { id: 1, name: "Ervin Howell" },
      ],
    });

    render(<DebounceSearch />);

    const input = screen.getByPlaceholderText(/search/i);

    // Gõ nhanh nhiều lần
    await user.type(input, "Ervin");

    // Chưa chạy timer → debounce chưa gọi fetch
    expect(fetch).toHaveBeenCalledTimes(1); 
    // (1 lần là fetch khi mount)

    // Chạy hết 500ms debounce
    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users?q=Ervin"
      );
    });

    expect(
      await screen.findByText("Ervin Howell")
    ).toBeInTheDocument();
  });

  it("Hiển thị 'No result!' khi API trả về mảng rỗng", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: async () => [],
    });

    render(<DebounceSearch />);

    expect(
      await screen.findByText(/No result!/i)
    ).toBeInTheDocument();
  });

  it("Không crash khi fetch bị lỗi", async () => {
    (fetch as jest.Mock).mockRejectedValue(
      new Error("Network error")
    );

    render(<DebounceSearch />);

    await waitFor(() => {
      expect(screen.getByText(/No result!/i)).toBeInTheDocument();
    });
  });
});
