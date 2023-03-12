import React, { useState } from 'react';
import styled from "@emotion/styled/macro";

interface todoListProps {
    id?: number;
    title?: string;
    complete?: boolean;
    date?: string;
}

const TodoList = (
    {
    id = 0,
    title = 'Todo Title',
    complete = true,
    date = '2000-04-18'
}: todoListProps) => 
{
    console.log(title, complete)

  return (
    <>
      <div>
        <button>
            {complete? <p>O</p>: <p>X</p>}
        </button>
        <p>{title}</p>
      </div>
    </>
  );
};

export default TodoList;