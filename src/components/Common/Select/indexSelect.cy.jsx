import React from "react";
import { Select } from "./index";
import { useState } from "react";

describe("Select Component", () => {
  const data = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const TestIcon = () => <span className="test-icon">▼</span>;

  const WrapperComponent = () => {
    const [selected, setSelected] = useState({ testSelect: "option1" });

    return (
      <Select
        data={data}
        icon={TestIcon}
        name="testSelect"
        setSelected={setSelected}
        selected={selected}
      />
    );
  };

  beforeEach(() => {
    cy.mount(<WrapperComponent />);
  });

  it("renders correctly", () => {
    cy.get('select[name="testSelect"]').should("exist");
    cy.get('select[name="testSelect"]').should("have.value", "option1");
  });

  // including the default option
  it("displays options correctly", () => {
    cy.get('select[name="testSelect"]')
      .children("option")
      .should("have.length", data.length + 1);
    data.forEach((option) => {
      cy.get('select[name="testSelect"]').contains(option.label);
    });
  });

  it("updates selected value on change", () => {
    cy.get('select[name="testSelect"]').select("Option 2");
    cy.get('select[name="testSelect"]').should("have.value", "option2");
  });

  it("renders the icon", () => {
    cy.get(".test-icon").should("exist");
  });
});
