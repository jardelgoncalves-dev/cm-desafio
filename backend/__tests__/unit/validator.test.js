import { describe, it, expect, beforeEach } from '@jest/globals';

import { validator } from '../../src/utils';

describe('Validation test unit', () => {
  it('should return an object error if name is not entered', () => {
    const name = ''

    const validations = validator({
      'name:required': name,
    })

    expect(validations.hasError()).toBe(true)
    expect(validations.error).toBeDefined()
    expect(validations.error.name).toBe('Campo é obrigatório.')
  })

  it('should return an object empty if there is not error', () => {
    const name = 'Jardel'

    const validations = validator({
      'name:required': name,
    })

    expect(validations.hasError()).toBe(false)
  })
})
