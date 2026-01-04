import { mapOrder } from '~/utils/mapOrder';

describe('mapOrder()', () => {
  // Case 1: sắp xếp đúng theo orderArray (case cơ bản)
  it('should order items based on orderArray', () => {
    const originalArray = [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' }
    ]

    const orderArray = ['c', 'a']

    const result = mapOrder(originalArray, orderArray, 'id')

    expect(result.map(i => i.id)).toEqual(['c', 'a', 'b'])
  })

  // Case 2: phần tử không có trong orderArray sẽ xuống cuối
  it('should place items not in orderArray at the end', () => {
    const originalArray = [
      { id: 'home' },
      { id: 'about' },
      { id: 'contact' }
    ]

    const orderArray = ['about']

    const result = mapOrder(originalArray, orderArray, 'id')

    expect(result.map(i => i.id)).toEqual(['about', 'home', 'contact'])
  })

  // Case 3: giữ nguyên thứ tự tương đối của các item không match
  it('should keep relative order for items not in orderArray', () => {
    const originalArray = [
      { id: 'x' },
      { id: 'y' },
      { id: 'z' }
    ]

    const orderArray: string[] = []

    const result = mapOrder(originalArray, orderArray, 'id')

    expect(result.map(i => i.id)).toEqual(['x', 'y', 'z'])
  })

  // Case 4: originalArray không bị mutate
  it('should not mutate originalArray', () => {
    const originalArray = [
      { id: 'a' },
      { id: 'b' }
    ]

    const orderArray = ['b', 'a']

    mapOrder(originalArray, orderArray, 'id')

    expect(originalArray.map(i => i.id)).toEqual(['a', 'b'])
  })

  // Case 5: orderArray chứa key không tồn tại trong originalArray
  it('should ignore keys in orderArray that do not exist in originalArray', () => {
    const originalArray = [
      { id: 'a' },
      { id: 'b' }
    ]

    const orderArray = ['c', 'b']

    const result = mapOrder(originalArray, orderArray, 'id')

    expect(result.map(i => i.id)).toEqual(['b', 'a'])
  })

  // Case 6: key không tồn tại trong object
  it('should move items with missing key to the end', () => {
    const originalArray = [
      { id: 'a' },
      { name: 'no-id' },
      { id: 'b' }
    ]

    const orderArray = ['b', 'a']

    const result = mapOrder(originalArray, orderArray, 'id')

    expect(result.map(i => i.id ?? null)).toEqual(['b', 'a', null])
  })

  // Case 7: input không hợp lệ
  it('should return empty array for invalid input', () => {
    expect(mapOrder([], [], '')).toEqual([])
    expect(mapOrder(null as any, [], 'id')).toEqual([])
    expect(mapOrder([], null as any, 'id')).toEqual([])
  })
})