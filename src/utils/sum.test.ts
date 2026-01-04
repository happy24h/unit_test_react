// Import hàm sum cần được kiểm thử
import { sum, sum2 } from '~/utils/sum';

// describe dùng để nhóm các test case liên quan tới hàm sum
describe('Unit Test sum():', () => {

    // it đại diện cho một kịch bản test cụ thể
    // Test này kiểm tra: sum(2, 3) có trả về 5 hay không
    it("should return 5 when sum(2, 3)", () => {

        // expect: giá trị thực tế là sum(2, 3)
        // toBe(5): giá trị mong đợi là 5
        // Nếu giống nhau => test pass
        expect(sum(2, 3)).toBe(5);
        expect(sum2(2, 3, 1)).toBe(6);
    });

});
