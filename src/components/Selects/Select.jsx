import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SelectList } from './SelectList'
import { config } from '../../../config'
import { Loader } from '../Loader/Loader'

const SelectWrapper = styled.div`
  flex-grow: 1;
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  min-height: 46px;
  border-radius: ${({ height }) => height / 2 || '23px'};
  position: relative;
  background-color: ${({ theme }) =>
    theme.backgroundColor.third || 'rgba(255, 255, 255, .7)'};
  border: none;
  font-size: ${({ theme, screenType = 'default' }) =>
    theme.fontSizes[screenType] || 16}px;
  color: ${({ theme }) => theme.textColor.primary || 'rgba(255, 255, 255, 1)'};
  padding: ${({ padding }) => padding || '1% 5%'};
  margin: ${({ margin }) => margin || '0'};
  transition: all ease ${({ theme }) => theme.animationTime / 1000 || '.2'}s;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    width: 10px;
    height: 10px;
    background-color: transparent;
    border: 2px solid
      ${({ theme }) => theme.textColor.primary || 'rgba(255, 255, 255, 1)'};
    border-top: none;
    border-left: none;
    transform: translate(-50%, -50%) rotate(45deg);
    transition: all ease ${({ theme }) => theme.animationTime / 1000 || '.2'}s;
  }

  &:hover {
    color: ${({ theme }) =>
      theme.textColor.secondary || 'rgba(255, 255, 255, .4)'};

    &:after {
      border-color: ${({ theme }) =>
        theme.textColor.secondary || 'rgba(255, 255, 255, .4)'};
    }
  }
`

const SelectListItem = styled.li`
  color: ${({ theme }) => theme.textColor.active || '#000000'};
  font-size: ${({ theme, screenType = 'default' }) =>
    theme.fontSizes[screenType] || 12}px;
  cursor: pointer;
  transition: all ease ${({ theme }) => theme.animationTime / 1000 || '.2'}s;
  border-radius: ${({ height }) => height / 2 || '23px'};
  background-color: ${({ selected, theme }) =>
    selected ? theme.backgroundColor.selected : 'transparent'};
  height: ${({ theme, screenType = 'default' }) =>
    theme.fontSizes[screenType] * 2 || 24}px;
  display: flex;
  align-items: center;
  padding: 0 5%;

  &:hover {
    color: ${({ theme }) => theme.textColor.hover || 'rgba(0, 0, 0, .6)'};
  }
`

const SelectLabel = styled.span`
  color: ${({ theme }) => theme.textColor.secondary || 'inherit'};
`

const separator = ', '

const Select = props => {
  const newProps = {
    ...props,
  }

  delete newProps.options

  const [visibleList, setVisibleList] = useState(false)
  const initialOption = () =>
    !props.multiselect
      ? props.options
        ? props.options.find(({ value }) => value === props.value)
        : {}
      : props.options
      ? props.options.filter(({ value }) =>
          props.value.split(separator).includes(value)
        )
      : {}
  const initialValue = () =>
    !props.multiselect
      ? initialOption()?.value || config.search.filter[0].value
      : initialOption()
          ?.map(({ value }) => value)
          .join(separator) || config.search.filter[0].value
  const initialTitle = () =>
    !props.multiselect
      ? initialOption()?.title || config.search.filter[0].title
      : initialOption()
          ?.map(({ title }) => title)
          .join(separator) || config.search.filter[0].title
  const [selectValue, setSelectValue] = useState(initialValue())
  const [selectTitle, setSelectTitle] = useState(initialTitle())
  const openListHandler = () => setVisibleList(true)
  const closeListHandler = () => setVisibleList(false)
  const selectHandler = event => {
    event.stopPropagation()

    const newValue = event.target.attributes.value.value
    const newTitle = event.target.innerText

    if (newValue === '') {
      setSelectValue(newValue)
      setSelectTitle(newTitle)
      closeListHandler()
      props.chooseOption(newValue)

      return
    }

    if (!props.multiselect) {
      setSelectValue(newValue)
      setSelectTitle(newTitle)
      closeListHandler()
      props.chooseOption(newValue)
    } else {
      const getNewStringParam = (prevValue, newValue) => {
        const prevValuesArr = prevValue.split(separator)

        if (prevValuesArr.includes(newValue)) {
          return prevValuesArr
            .filter(
              val =>
                val !== config.search.filter[0].value &&
                val !== config.search.filter[0].title &&
                val !== newValue
            )
            .join(separator)
        }

        return [...prevValuesArr, newValue]
          .filter(
            val =>
              val !== config.search.filter[0].value &&
              val !== config.search.filter[0].title
          )
          .join(separator)
      }

      const newValues = getNewStringParam(selectValue, newValue)
      const newTitles = getNewStringParam(selectTitle, newTitle)

      setSelectValue(newValues)
      setSelectTitle(newTitles)
      props.chooseOption(newValues)
    }
  }

  return (
    <SelectWrapper {...newProps} onClick={openListHandler}>
      {visibleList && (
        <SelectList
          closeList={closeListHandler}
          fullScroll={props.fullScroll}
          width={props.width}
          height={props.height}
          loadingOptions={props.loadingOptions}
        >
          {props.options?.map(({ value, title }) => (
            <SelectListItem
              screenType={props.screenType}
              height={props.height}
              key={value}
              selected={selectValue.split(separator).includes(value)}
              value={value}
              onClick={selectHandler}
            >
              {title}
            </SelectListItem>
          ))}
          {props.loadingOptions && (
            <Loader size='0.5' color={config.theme.backgroundColor.primary} />
          )}
        </SelectList>
      )}
      {props.label && <SelectLabel>{props.label}&nbsp;:&nbsp;</SelectLabel>}
      {selectTitle}
    </SelectWrapper>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      selected: PropTypes.bool,
    })
  ),
  chooseOption: PropTypes.func.isRequired,
  screenType: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  value: PropTypes.string.isRequired,
  fullScroll: PropTypes.func,
  loadingOptions: PropTypes.bool,
}

export { Select }
