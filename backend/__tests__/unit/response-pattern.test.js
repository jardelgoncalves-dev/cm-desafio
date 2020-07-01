import { describe, it, expect } from '@jest/globals';

import { errorResponse, successResponse } from '../../src/utils';

describe('Response Pattern test unit', () => {
  it('Success Response: should return an object with the status and data properties', () => {
    const successData = { name: 'Jardel' }
    const response = successResponse(successData, 200)

    expect(response.data).toBeDefined()
    expect(response.data.name).toBe(successData.name)
    expect(response.status).toBe(200)
  })

  it('Error Response: should return an object with the status and data properties', () => {
    const errorData = { name: 'Campo é obrigatório.' }
    const response = errorResponse(errorData, 400)

    expect(response.data).toBeDefined()
    expect(response.data.name).toBe(errorData.name)
    expect(response.status).toBe(400)
  })

})
