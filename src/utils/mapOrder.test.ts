import { mapOrder } from '~/utils/mapOrder';

describe('mapOrder()', () => {
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
})