import { validateEmail } from "~/utils/validateEmail";

describe("Unit Test: validateEmail():", () => {
  const cases: any[] = [
    ["trungquandev.official@gmail.com", true],
    ["trungquandev@", false],
    ["trungquandev", false],
    // [{email: "trungquandev.official@gmail.com" }, true], // Test hiển thị placeholder cho object lúc fail

  ];

  // Dùng each để lặp qua các cases và test cho từng case, giúp chúng ta viết test ngắn gọn khi có nhiều bộ dữ liệu test lặp đi lặp lại cùng một logic.
  // %p mà chúng ta sử dụng là dạng placeholder kiểu pretty-format in ra log giá trị gốc khi test được thực thi. Giúp dễ debug test case bị fail.
  // https://jestjs.io/docs/api#testeachtablename-fn-timeout

  it.each(cases)("%p =>>>> %p", (email, expected) => {
    expect(validateEmail(email)).toBe(expected);
  });
});
