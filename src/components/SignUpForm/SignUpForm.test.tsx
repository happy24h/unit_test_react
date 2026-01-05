import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUpForm } from "~/components/SignUpForm/SignUpForm";

describe("SignUpForm Component", () => {
  it("Hiển thị lỗi khi submit form rỗng", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<SignUpForm onSubmit={onSubmit} />);

    // Click submit khi chưa nhập gì
    await user.click(screen.getByRole("button", { name: /submit/i }));

    // Kiểm tra message validate
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();

    // Đảm bảo callback submit KHÔNG được gọi
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("Hiển thị lỗi khi email không hợp lệ", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<SignUpForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText(/enter email/i), "invalid-email");
    await user.type(screen.getByPlaceholderText(/enter password/i), "123456");

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText("Email is not valid")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("Hiển thị lỗi khi password ngắn hơn 6 ký tự", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<SignUpForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText(/enter email/i), "test@gmail.com");
    await user.type(screen.getByPlaceholderText(/enter password/i), "123");

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText("Password must be at least 6 characters")
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("Gọi onSubmit với dữ liệu hợp lệ và reset form", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<SignUpForm onSubmit={onSubmit} />);

    const emailInput = screen.getByPlaceholderText(/enter email/i);
    const passwordInput = screen.getByPlaceholderText(/enter password/i);

    await user.type(emailInput, "test@gmail.com");
    await user.type(passwordInput, "123456");

    await user.click(screen.getByRole("button", { name: /submit/i }));

    // Đảm bảo onSubmit được gọi đúng data
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: "test@gmail.com",
        password: "123456",
      });
    });

    // Form được reset sau khi submit
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });

  it("Render form với defaultValues nếu được truyền vào", () => {
    render(
      <SignUpForm
        onSubmit={jest.fn()}
        defaultValues={{ email: "default@gmail.com", password: "abcdef" }}
      />
    );

    expect(screen.getByDisplayValue("default@gmail.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("abcdef")).toBeInTheDocument();
  });
});
