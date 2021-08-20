import { mount } from '@cypress/react'
import React from 'react'

import { Grow } from '../../src/pages/Anime/Grow'

import ComponentTestScreen from './ComponentTestScreen'

describe('<Grow/> Component test', () => {
  beforeEach(() => {
    mount(
      <ComponentTestScreen>
        <Grow />
      </ComponentTestScreen>
    )
  })

  it('show component', () => {
    cy.wait(1000)
    cy.get('[data-cy=grow]').should('exist')
    cy.wait(1000)
  })

  it('grow height while hovering', () => {
    cy.wait(1000)
    cy.get('[data-cy=grow]').realHover()
    cy.get('[data-cy=grow]').should('have.css', 'height', '200px')
    cy.wait(1000)
  })
})
