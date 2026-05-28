import {describe, expect, it} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import Counter from '../components/Counter';
import '@testing-library/jest-dom';

describe("Counter tests", () => {

    it("should render", () => {

        render(<Counter initCount={10} />);
        const element = screen.getByText("Counter: 10");
        expect(element).toBeInTheDocument();
    })

     it("should increment the counter", () => {

        render(<Counter initCount={10} />);
        const element = screen.getByText("Counter: 10");
        expect(element).toBeInTheDocument();
        const btn = screen.getByText(/Inc/);
        fireEvent.click(btn);

        const updatedElement = screen.getByText("Counter: 11");
        expect(updatedElement).toBeInTheDocument();
    })

})