import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from '../components/Counter';
import {describe, expect, it} from 'vitest'

describe("Counter", () => {


    it("should render Counter", () => {

        render(<Counter initCount={5}/>)
        const element = screen.getByText("Counter: 5")
        expect(element).toBeInTheDocument();
        const btn = screen.getByText(/inc/i);
        fireEvent.click(btn);
        const element1 = screen.getByText("Counter: 6")
        expect(element1).toBeInTheDocument();

    })

})