/// <reference lib="webworker" />

import { DataObject } from "../models/worker-response.model";

addEventListener('message', ({data}) => {
  const { interval, size } = data;
  
  const pseudoSocket = setInterval(() => {
    const data = generateData(size);
    postMessage(data);
  }, interval);

  addEventListener('error', () => {
    clearInterval(pseudoSocket);
  });

  addEventListener('terminate', () => {
    clearInterval(pseudoSocket);
  });

});

function generateData(size: number): DataObject[] {
  
  const data = [];

  for (let i = 0; i < size; i++) {
    const id =  Math.random().toString(36).substring(2, 15)
    const int = Math.floor(Math.random() * 100);
    const float = parseFloat((Math.random() * 1000).toFixed(18));
    const color = getRandomColor();
    const child = { id: Math.random().toString(36).substring(2, 9), color: getRandomColor() };
    
    data.push({ id, int, float, color, child });
  }

  return data;
}

function getRandomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}