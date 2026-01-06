import { renderHook, act } from "@testing-library/react";
import { useCounter } from "~/hooks/useCounter";

describe("useCounter hook", () => {
  // Test: hook khởi tạo với giá trị mặc định là 0
  it("should initialize with default value 0", () => {
    // Render hook useCounter mà không truyền initialValue
    const { result } = renderHook(() => useCounter());

    // Kiểm tra count ban đầu phải bằng 0
    expect(result.current.count).toBe(0);
  });

  // Test: hook khởi tạo với giá trị truyền vào
  it("should initialize with provided initial value", () => {
    // Render hook với initialValue = 5
    const { result } = renderHook(() => useCounter(5));

    // count ban đầu phải bằng 5
    expect(result.current.count).toBe(5);
  });

  // Test: hàm increment tăng count lên 1
  it("should increment count by 1", () => {
    const { result } = renderHook(() => useCounter(0));

    // act dùng để bọc các hành động làm thay đổi state
    act(() => {
      result.current.increment();
    });

    // Sau khi increment, count phải là 1
    expect(result.current.count).toBe(1);
  });

  // Test: hàm decrement giảm count xuống 1
  it("should decrement count by 1", () => {
    const { result } = renderHook(() => useCounter(2));

    act(() => {
      result.current.decrement();
    });

    // 2 - 1 = 1
    expect(result.current.count).toBe(1);
  });

  // Test: không cho phép count giảm xuống dưới 0
  it("should not decrement below 0", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.decrement();
    });

    // count vẫn phải là 0, không được âm
    expect(result.current.count).toBe(0);
  });

  // Test: reset sẽ đưa count về giá trị initialValue ban đầu
  it("should reset count to initial value", () => {
    const { result } = renderHook(() => useCounter(3));

    act(() => {
      result.current.increment();
      result.current.increment();
    });

    // 3 + 2 = 5
    expect(result.current.count).toBe(5);

    act(() => {
      result.current.reset();
    });

    // reset về lại initialValue = 3
    expect(result.current.count).toBe(3);
  });
});
