import { renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { useTitle } from "../hooks/useTitle";

describe("useTitle", () => {
    it("should set the document title on mount and restore it on unmount", () => {
        const originalTitle = "Original Title";
        document.title = originalTitle;

        const { unmount } = renderHook(() => useTitle("Login"));

        expect(document.title).toBe("Login");

        unmount();

        expect(document.title).toBe(originalTitle);
    });
});
