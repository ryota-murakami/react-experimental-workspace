import React, { memo } from 'react'

import './index.css'

const Suggestion: React.FC = memo(
  () => (
    <>
      <input type="text" id="search" autoComplete="off" onInput={suggest} />
      <div id="suggestions" className="suggestions"></div>
    </>
  ),
  () => true,
)
Suggestion.displayName = 'Suggestion'

export default Suggestion

function suggest() {
  // @ts-expect-error @TODO override HTMLElement
  const query = document.getElementById('search')!.value
  const suggestionsBox = document.getElementById('suggestions')!
  suggestionsBox.innerHTML = '' // Clear any previous suggestions

  if (query.length > 0) {
    // Assuming data is an array of strings for suggestion
    const data = [
      'apple',
      'banana',
      'cherry',
      'date',
      'elderberry',
      'fig',
      'grape',
      'honeydew',
    ]

    const filteredData = data.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase()),
    )

    filteredData.forEach((item) => {
      const suggestionItem = document.createElement('div')
      suggestionItem.className = 'suggestion-item'
      suggestionItem.textContent = item
      suggestionItem.onclick = function () {
        // @ts-expect-error @TODO override HTMLElement
        document.getElementById('search')!.value = item
        suggestionsBox.innerHTML = '' // Clear suggestions after selection
      }
      suggestionsBox.appendChild(suggestionItem)
    })
  }
}
