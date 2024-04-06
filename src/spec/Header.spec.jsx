import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import Header from "../components/Header";
import useFullScreenStore from "../store/useFullScreen";

describe("Header Component tests", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
  });

  it("does not render when in full screen mode", async () => {
    act(() => {
      const { setIsFullScreen } = useFullScreenStore.getState();
      setIsFullScreen(true);
    });

    const headerElement = screen.queryByText("W2M");
    expect(headerElement).toBeNull();
  });
});
