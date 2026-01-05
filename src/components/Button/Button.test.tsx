import { Button } from "~/components/Button/Button";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Button Component", () => {
  it("Should render and click to button", async () => {
    // Tạo một cái user instance 
    const user = userEvent.setup();
    // Tạo một hàm giả để kiểm tra sự kiện onClick
    const ọnClick = jest.fn();
    // Render Button component với props content và onClick
    render(<Button content="Click Me" onClick={ọnClick} />);

    // Dùng getByRole để lấy button theo vai trò và tên hiển thị
    const button = screen.getByRole("button", { name: /click me/i });

    // Mô phỏng hành vi click vào button (2 lần)
    await user.click(button);
    await user.click(button);

    // Kiểm tra xem button có được render hay không
    expect(button).toBeInTheDocument();
    // Kiểm tra xem hàm onClick đã được gọi đúng số lần hay chưa
    expect(ọnClick).toHaveBeenCalledTimes(2);
    
  })
 
});