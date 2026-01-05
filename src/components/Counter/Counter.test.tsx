import { Counter } from "~/components/Counter/Counter";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Nhóm test cho Counter Component
describe("Counter Component", () => {

  // Test hành vi tăng / giảm giá trị
  // Mục tiêu:
  // 1. Click "+" nhiều lần thì count tăng
  // 2. Click "-" không được làm count < 0 (business rule)
  it("Tăng giảm giá trị (Đảm bảo không bị âm):", async () => {

    // Tạo user giả lập để mô phỏng hành vi người dùng thật
    // userEvent xử lý async giống trình duyệt (focus, pointer, click...)
    const user = userEvent.setup();

    // Render Counter component vào DOM giả (jsdom)
    render(<Counter />);

    // Lấy nút tăng giá trị (+) theo role & name
    // Đây là cách query được khuyến nghị (giống cách người dùng tương tác)
    const incrementButton = screen.getByRole("button", { name: "+" });

    // Lấy nút giảm giá trị (-)
    const decrementButton = screen.getByRole("button", { name: "-" });

    // Click tăng 2 lần → giả sử count = 2
    await user.click(incrementButton);
    await user.click(incrementButton);

    // Click giảm 3 lần
    // Lần cuối cố tình thử giảm xuống giá trị âm
    await user.click(decrementButton);
    await user.click(decrementButton);
    await user.click(decrementButton); // edge case: không được âm

    // Kiểm tra kết quả cuối cùng
    // Count phải dừng ở 0 chứ không được -1
    expect(
      screen.getByText(/Count: 0/i)
    ).toBeInTheDocument();
  });
});
