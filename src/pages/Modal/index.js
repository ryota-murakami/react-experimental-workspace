// @flow
import React from 'react'
import Downshift from 'downshift'
import { Layout } from './layout'

const items = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' }
]

export default () => {
  return (
    <Layout>
      <h1 className="header">Modal</h1>
      <div className="select-container">
        <Downshift
          onCange={selection =>
            alert(
              selection
                ? `You selected ${selection.value}`
                : 'Selection Cleared'
            )
          }
          itemToString={item => (item ? item.value : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem
          }) => (
            <div>
              <label {...getLabelProps()}>Enter a fruit</label>
              <input {...getInputProps()} />
              <ul {...getMenuProps()}>
                {isOpen
                  ? items
                      .filter(
                        item => !inputValue || item.value.includes(inputValue)
                      )
                      .map((item, index) => (
                        <li
                          {...getItemProps({
                            key: item.value,
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index
                                  ? 'lightgray'
                                  : 'while',
                              fontWeight:
                                selectedItem === item ? 'bold' : 'normal'
                            }
                          })}
                        >
                          {item.value}
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          )}
        </Downshift>
      </div>
    </Layout>
  )
}
