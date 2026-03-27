# Thuthan: Renewable Energy News Aggregator

## Overview

Thuthan is a full-stack web application that fetches, categorizes, and displays renewable energy news from India and international sources via Google News. The application aggregates news related to solar, wind, hydrogen, electric vehicles, battery storage, and other clean energy topics.

---

## Features

- **GNews API Integration** - Fetches news from Google News via GNews API
- **Multi-Region Sources** - India and international news
- **Last 24 Hours Filter** - Shows only news from the last 24 hours
- **Smart Categorization** - Classifies articles into 4 categories
- **Manual Refresh** - Click Refresh button to fetch new news
- **PDF Export** - Download selected articles or all displayed news as PDF
- **Category Filtering** - Filter by category
- **Pagination** - Browse through articles with Previous/Next
- **LocalStorage Cache** - News persists between page refreshes
- **Live Date & Time** - Shows current date and time in navbar

---

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icon library
- **date-fns** - Date formatting
- **jsPDF** - PDF generation

### Backend
- **Express.js** - Web framework
- **Node.js** - Runtime
- **Axios** - HTTP client for external API
- **GNews API** - News data source
- **dotenv** - Environment configuration

---

## Project Structure

```
Thuthan/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── NewsCard.jsx           # News card with compact/default variants
│   │   │   ├── HeroSection.jsx         # News grid with pagination
│   │   │   ├── Navbar.jsx             # Navigation with date/time, download & refresh
│   │   │   ├── ErrorMessage.jsx        # Error display
│   │   │   └── FloatingDownloadButton.jsx  # Floating PDF download button
│   │   ├── hooks/
│   │   │   └── useNews.js            # News fetching & caching hook
│   │   ├── services/
│   │   │   └── newsApi.js            # Backend API client
│   │   ├── utils/
│   │   │   ├── categoryFilter.js      # Category filtering
│   │   │   ├── constants.js           # App constants & category map
│   │   │   └── pdfGenerator.js       # PDF generation
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── backend/                  # Express.js API server
│   ├── src/
│   │   ├── config/
│   │   │   └── app.js         # Express app configuration
│   │   ├── routes/
│   │   │   └── news.js        # /api/news endpoint
│   │   ├── services/
│   │   │   └── newsService.js # GNews API integration & caching
│   │   └── utils/
│   │       └── filter.js      # Article categorization logic
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

---

## Key Features Explained

### News Fetching
- Fetches from GNews API (Google News)
- India queries: renewable energy, solar energy, wind energy
- International query: renewable energy (worldwide)
- 24-hour filter removes older news

### Categorization
Articles are automatically classified into:
- **Companies & Products** - Business news, product launches, company announcements
- **Government & Tariff** - Policy, subsidies, regulations, tenders
- **International News** - News from outside India (US, Europe, China, etc.)
- **Others** - General renewable energy news

### Manual Refresh
- Click Refresh button to fetch latest news
- Loading indicator shows during fetch
- Cache persists for 24 hours

### PDF Export
- Select individual articles using "Add to PDF" button
- Download All button exports all displayed news
- Floating button appears when articles are selected

---

## Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **GNews API Key** (free: 100 requests/day) - Required for fetching news

### Step 1: Setup

```bash
cd Thuthan
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 4: Configure GNews API Key (Optional)

```bash
# Edit backend/.env
GNEWS_API_KEY=your_gnews_api_key
```

Get free API key from: https://gnews.io

---

## Running the Project

### Start Backend

```bash
cd backend
npm run dev
```

Backend runs on: http://localhost:5001

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on: http://localhost:5173

---

## API Endpoints

### Health Check

```
GET http://localhost:5001/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### News Feed

```
GET http://localhost:5001/api/news
```

Response:
```json
{
  "articles": [
    {
      "title": "Article Title",
      "description": "Article description...",
      "url": "https://example.com/news",
      "image": "https://example.com/image.jpg",
      "publishedAt": "2024-01-01T12:00:00.000Z",
      "source": { "name": "Source Name" },
      "country": "in",
      "category": "Companies & Products"
    }
  ],
  "totalArticles": 50,
  "isMock": false
}
```

Error Response (when API fails):
```json
{
  "error": "API key not configured. Please set GNEWS_API_KEY in your .env file to fetch live news.",
  "articles": [],
  "totalArticles": 0,
  "isMock": false
}
```

---



---

## Credits

- News data powered by [GNews API](https://gnews.io) (Google News)
- Built with React, Express.js, and Tailwind CSS
