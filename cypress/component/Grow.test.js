import React from 'react'
import { mount } from '@cypress/react'
import TestScreen from './TestScreen'
import { Grow } from '../../src/pages/Anime/Grow'

describe('<Grow/> Component test', () => {
  beforeEach(() => {
    mount(
      <TestScreen>
        <Grow />
      </TestScreen>
    )
  })

  it('show component', () => {
    cy.wait(5000)
    cy.get('[data-cy=grow]').should('exist')
  })

  it('grow height while hovering', () => {
    cy.get('[data-cy=grow]').realHover()
    cy.get('[data-cy=grow]').should('have.css', 'height', '200px')
    cy.wait(5000)
  })
})
