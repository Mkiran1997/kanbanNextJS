import React from "react";
import AddTaskModal from "./AddTaskModal";

describe("AddTaskModal Component", () => {
  let onCloseStub;

  beforeEach(() => {
    onCloseStub = cy.stub().as("onClose");

    cy.mount(
      <AddTaskModal
        onClose={onCloseStub}
        columnOptions={[
          { value: "1", label: "Column 1" },
          { value: "2", label: "Column 2" },
        ]}
        userOptions={[
          { value: "User 1", label: "User 1" },
          { value: "User 2", label: "User 2" },
        ]}
        categoryOptions={[
          { value: "Category 1", label: "Category 1" },
          { value: "Category 2", label: "Category 2" },
        ]}
      />
    );
  });

  it("renders the modal with form elements", () => {
    cy.get("h3").contains("Create New Task").should("be.visible");
    cy.get('textarea[name="description"]').should("be.visible");
    cy.get('select[name="column"]').should("be.visible");
    cy.get('select[name="user"]').should("be.visible");
    cy.get('select[name="category"]').should("be.visible");
    cy.get('button[type="submit"]')
      .contains("Add new product")
      .should("be.visible");
  });
});
