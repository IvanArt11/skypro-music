import styled from 'styled-components'

export const Bar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(28, 28, 28, 0.5);
`

export const BarContent = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
`

export const Timer = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
  color: #696969;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.016px;
  padding-bottom: 10px;
  padding-right: 57px;
`

export const BarPlayerProgress = styled.input`
  --progress-height: 5px;
  --progress-color: #b672ff;
  --progress-color: ${(props) => props.color ?? '#b672ff'};

  --progress-bg-color: #2e2e2e;

  margin: 0;
  width: 100%;
  height: var(--progress-height);
  -webkit-appearance: none;
  cursor: pointer;
  background: transparent;
  position: relative;
  overflow: hidden;

  &:hover {
    --progress-height: 8px;
  }

  &::-webkit-slider-runnable-track {
    position: relative;
    height: var(--progress-height);
    background: var(--progress-bg-color);
  }
  &::-webkit-slider-thumb {
    --thumb-height: 1px;
    --thumb-width: 1px;
    position: relative;
    -webkit-appearance: none;
    width: var(--thumb-width, var(--thumb-height));
    box-shadow: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0
      100vmax var(--progress-color);
  }

  &::-webkit-slider-runnable-track {
    background: var(--progress-bg-color);
  }

  /* FF */
  &::-moz-range-track {
    width: 100%;
    height: var(--progress-height);
    background: var(--progress-bg-color);
    border: none;
    border-radius: 0px;
  }
  &::-moz-range-thumb {
    border: none;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background: transparent;
  }
  &::-moz-range-progress {
    background-color: var(--progress-color);
    height: var(--progress-height);
  }
`

export const BarPlayerBlock = styled.div`
  height: 73px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
`

export const BarPlayer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
`
