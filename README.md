# Remotely

## Overview

Clique is a dynamic social media application designed to foster connections and engagement. This versatile platform allows users to share updates, photos. making it easy to stay connected with friends.

## Features

1. Users can Create a post
2. Users can Update the post
3. Users can Delete the post
4. Users can like and saved the post

## Technologies Used

1.  **Frontend:**

-   **React:** A popular JavaScript library for building user interfaces.

-   **Tailwind CSS:** A utility-first CSS framework for styling the frontend.

-   **React-query**: A JavaScript library designed to simplify the complex task of data fetching and caching in React applications.

-   **Zod**: A schema declaration and validation library for typescript.

2.  **Database:**

-   **Appwrite:** An Open-source platform that lets you add Auth, DBs, Functions and Storage to your product and build any application at any scale.

## Setup and Installation

### Prerequisites

-   npm (Node Package Manager) installed.

-   A modern web browser (e.g., Chrome, Firefox).

### Quick Setup

1. Clone the repository:

```bash

git clone https://github.com/skies-codes/Clique.git

```

2. Change to the Project Directory

```bash

cd Clique

```

3. Update the .env file from `.env.example` to `.env.local`

```bash

VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_STORAGE_ID=
VITE_APPWRITE_USER_COLLECTION_ID=
VITE_APPWRITE_POST_COLLECTION_ID=
VITE_APPWRITE_SAVES_COLLECTION_ID=

```

4. Run

```bash
npm install
```

5. To start the local development

```bash
npm run dev
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
