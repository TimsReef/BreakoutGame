import styled from 'styled-components';

export const Canvas = styled.canvas`
  box-sizing: border-box;
  border: 5px solid black;
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 0;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  border-image-slice: 1;
  touch-action: none;
  position: fixed;
  overflow: hidden;
  border-image-source: linear-gradient(to left, #004080, #002060);
  `;