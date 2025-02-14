<img src="./public/techember.png" alt="techember homepage" style="border-radius: 10%;"/>

## Table of Contents

- [Task Requirements](#task-requirements)
  - [Core Features](#core-features)
  - [Acceptance Criteria](#acceptance-criteria)
- [Getting Started](#getting-started)

## Task Requirements

### Task - Conference Ticket Generator

You will build and host a **Conference Ticket Generator** using **React or any React Framework (e.g., Next.js, etc.)**. The ticket generator will allow users to fill out a form with their details, perform validations on the inputs, and generate a ticket upon successful submission.

**Note: Only React or any React Framework is allowed.**

### Core Features

1. **Form Elements**:
   - Full Name: Text input for the user's full name.
   - Email Address: Email input field.
   - Avatar Upload: Users should upload their avatar image and store it using **Cloudinary** or any image hosting service. The form should only accept and submit the image **URL**.
   - Submit Button: Button to submit the form.
2. **Form Validation**:

   - Ensure all required fields are filled in before submission.
   - The email should have a valid format.
   - The avatar upload should accept **Cloudinary URLs or any image link**.
     - Provide clear error messages near the respective field if validation fails.

3. **State Persistence**

   - The form should retain user inputs using **IndexedDB or local storage** so that the data is not lost on page refresh.

4. **Accessibility**

   - Ensure all form fields, hints, and error messages are screen-reader accessible.
   - All elements must be focusable, with clear hover and focus states.
   - Users must be able to navigate the form and submit it using only the keyboard.

5. **Ticket Generation**

   - On successful submission, generate and display a Conference Ticket containing:
     - Full Name
     - Email Address
     - Avatar (displayed as an image from the provided URL)
   - The ticket **should only be generated if the form passes validation**.

6. **Responsive Design**

   - Ensure the form and ticket layout **adjust seamlessly** across different screen sizes.
     - Optimize for small screens with proper spacing and stacking.

### Acceptance Criteria

1. **Form Validation:**

   - Users must provide all required details before submission.
   - The email should be in a valid format.
   - Avatar uploads should be handled via **Cloudinary or any external image URL submission**.
   - Display relevant **error messages** near the respective fields.

2. **State Persistence**

   - The form fields should **persist user input** using **IndexedDB or local storage**, ensuring data remains intact even if the page is refreshed.

3. **Ticket Generation:**

   - The generated ticket should display the user’s full name, email, and avatar.
   - The ticket should only appear when all form validations pass successfully.

4. **Accessibility:**

   - All form elements and error messages must be fully accessible and announced by screen readers.
   - The application must support complete keyboard navigation.

5. **Responsive Design:**

   - The form and generated ticket must be fully responsive and visually optimized for all device sizes.
   - Ensure the ticket is clearly visible immediately after submission on both mobile and desktop screens.

6. **Code Quality:**

   - Write modular, well-structured, and readable code.
   - Utilize appropriate React hooks (e.g., `useState`, `useEffect`) for state management and validation.
   - Implement proper form element types and validation techniques.

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
