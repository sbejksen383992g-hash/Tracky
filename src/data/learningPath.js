const learningPath = [
  {
    id: "html-css",
    title: "HTML & CSS",
    instructor: "SuperSimpleDev",
    estimatedDays: 70,
    color: "#f97316",
    icon: "🌐",

    modules: [
      {
        id: 1,
        title: "HTML Basics",
        project: "Personal Profile Page",

        lessons: [
          {
            id: 1,
            title: "What is HTML",
            duration: 2,
            practical: "Create first HTML file"
          },
          {
            id: 2,
            title: "First HTML Code",
            duration: 2,
            practical: "Build basic webpage"
          },
          {
            id: 3,
            title: "HTML Syntax",
            duration: 2,
            practical: "Practice proper structure"
          },
          {
            id: 4,
            title: "Link Element",
            duration: 1,
            practical: "Create navigation links"
          },
          {
            id: 5,
            title: "HTML Attributes",
            duration: 2,
            practical: "Use href, src and alt"
          },
          {
            id: 6,
            title: "Spaces & Indentation",
            duration: 1,
            practical: "Clean code formatting"
          }
        ]
      },

      {
        id: 2,
        title: "CSS Basics",
        project: "YouTube Buttons",

        lessons: [
          {
            id: 1,
            title: "What is CSS",
            duration: 1,
            practical: "Style first webpage"
          },
          {
            id: 2,
            title: "CSS Syntax",
            duration: 2,
            practical: "Practice selectors"
          },
          {
            id: 3,
            title: "Colors & RGB",
            duration: 2,
            practical: "Color different buttons"
          },
          {
            id: 4,
            title: "Classes",
            duration: 2,
            practical: "Reuse styles"
          },
          {
            id: 5,
            title: "Exercises",
            duration: 2,
            practical: "Complete CSS exercises"
          }
        ]
      },

      {
        id: 3,
        title: "Hover & Effects",
        project: "Animated Buttons",

        lessons: [
          {
            id: 1,
            title: "Hover",
            duration: 1,
            practical: "Hover effects"
          },
          {
            id: 2,
            title: "Transitions",
            duration: 2,
            practical: "Smooth animations"
          },
          {
            id: 3,
            title: "Shadows",
            duration: 2,
            practical: "Modern card design"
          }
        ]
      },
            {
        id: 4,
        title: "DevTools & Box Model",
        project: "YouTube Clone Components",

        lessons: [
          {
            id: 1,
            title: "Chrome DevTools",
            duration: 2,
            practical: "Inspect and edit webpage"
          },
          {
            id: 2,
            title: "Box Model",
            duration: 3,
            practical: "Practice margin & padding"
          },
          {
            id: 3,
            title: "Width & Height",
            duration: 2,
            practical: "Responsive boxes"
          },
          {
            id: 4,
            title: "Borders",
            duration: 1,
            practical: "Design modern cards"
          }
        ]
      },

      {
        id: 5,
        title: "Text Styles",
        project: "Article Layout",

        lessons: [
          {
            id: 1,
            title: "Font Family",
            duration: 1,
            practical: "Apply Google Fonts"
          },
          {
            id: 2,
            title: "Font Size & Weight",
            duration: 2,
            practical: "Typography practice"
          },
          {
            id: 3,
            title: "Text Alignment",
            duration: 1,
            practical: "Center and align text"
          },
          {
            id: 4,
            title: "Line Height & Spacing",
            duration: 2,
            practical: "Readable paragraphs"
          }
        ]
      },

      {
        id: 6,
        title: "HTML Structure",
        project: "Personal Portfolio",

        lessons: [
          {
            id: 1,
            title: "Header",
            duration: 1,
            practical: "Portfolio header"
          },
          {
            id: 2,
            title: "Main",
            duration: 1,
            practical: "Main content section"
          },
          {
            id: 3,
            title: "Footer",
            duration: 1,
            practical: "Portfolio footer"
          },
          {
            id: 4,
            title: "Semantic HTML",
            duration: 2,
            practical: "Replace divs with semantic tags"
          }
        ]
      },

      {
        id: 7,
        title: "Images",
        project: "Photo Gallery",

        lessons: [
          {
            id: 1,
            title: "Image Tag",
            duration: 1,
            practical: "Display local image"
          },
          {
            id: 2,
            title: "Image Sizing",
            duration: 2,
            practical: "Responsive images"
          },
          {
            id: 3,
            title: "Object Fit",
            duration: 2,
            practical: "Image cards"
          }
        ]
      },

      {
        id: 8,
        title: "Display & Divs",
        project: "YouTube Thumbnail",

        lessons: [
          {
            id: 1,
            title: "Display Block",
            duration: 2,
            practical: "Practice block elements"
          },
          {
            id: 2,
            title: "Display Inline Block",
            duration: 2,
            practical: "Horizontal layouts"
          },
          {
            id: 3,
            title: "Div Element",
            duration: 2,
            practical: "Build reusable sections"
          },
          {
            id: 4,
            title: "Nested Layouts",
            duration: 3,
            practical: "Create YouTube video card"
          }
        ]
      },
            {
        id: 9,
        title: "CSS Grid",
        project: "YouTube Video Grid",

        lessons: [
          {
            id: 1,
            title: "Grid Basics",
            duration: 2,
            practical: "2-column layout"
          },
          {
            id: 2,
            title: "Grid Columns",
            duration: 2,
            practical: "Responsive video grid"
          },
          {
            id: 3,
            title: "Grid Gap",
            duration: 1,
            practical: "Spacing practice"
          }
        ]
      },

      {
        id: 10,
        title: "Flexbox",
        project: "Navigation Bar",

        lessons: [
          {
            id: 1,
            title: "Flex Container",
            duration: 2,
            practical: "Horizontal navbar"
          },
          {
            id: 2,
            title: "Justify Content",
            duration: 2,
            practical: "Alignment practice"
          },
          {
            id: 3,
            title: "Align Items",
            duration: 2,
            practical: "Center layouts"
          }
        ]
      },

      {
        id: 11,
        title: "Position & Responsive Design",
        project: "Responsive YouTube Clone",

        lessons: [
          {
            id: 1,
            title: "Relative & Absolute Position",
            duration: 2,
            practical: "Notification badge"
          },
          {
            id: 2,
            title: "Fixed Position",
            duration: 2,
            practical: "Sticky navbar"
          },
          {
            id: 3,
            title: "Media Queries",
            duration: 3,
            practical: "Responsive website"
          },
          {
            id: 4,
            title: "Final HTML & CSS Project",
            duration: 5,
            practical: "Complete YouTube Homepage"
          }
        ]
      }
    ]
  },

  {
    id: "javascript",
    title: "JavaScript",
    instructor: "SuperSimpleDev",
    estimatedDays: 120,
    color: "#facc15",
    icon: "🟨",
    modules: [
      {
        id: 1,
        title: "JS Fundamentals",
        project: "Console Calculator",
        lessons: [
          { id: 1, title: "What is JavaScript", duration: 1, practical: "Run JS in the browser console" },
          { id: 2, title: "Variables (let, const, var)", duration: 2, practical: "Declare and reassign variables" },
          { id: 3, title: "Data Types", duration: 2, practical: "Practice strings, numbers, booleans" },
          { id: 4, title: "Operators", duration: 2, practical: "Build a console calculator" },
          { id: 5, title: "Template Literals", duration: 1, practical: "Format strings with variables" },
        ],
      },
      {
        id: 2,
        title: "Control Flow",
        project: "Grade Checker",
        lessons: [
          { id: 1, title: "If / Else Statements", duration: 2, practical: "Grade checker logic" },
          { id: 2, title: "Comparison & Logical Operators", duration: 2, practical: "Combine conditions" },
          { id: 3, title: "Switch Statements", duration: 1, practical: "Refactor if-chains" },
          { id: 4, title: "For & While Loops", duration: 2, practical: "Print multiplication tables" },
        ],
      },
      {
        id: 3,
        title: "Functions",
        project: "Reusable Utility Library",
        lessons: [
          { id: 1, title: "Function Declarations", duration: 2, practical: "Write reusable functions" },
          { id: 2, title: "Arrow Functions", duration: 2, practical: "Convert functions to arrow syntax" },
          { id: 3, title: "Parameters & Default Values", duration: 1, practical: "Add default params" },
          { id: 4, title: "Scope & Closures", duration: 3, practical: "Build a counter with closures" },
        ],
      },
      {
        id: 4,
        title: "Arrays & Objects",
        project: "Contact List Manager",
        lessons: [
          { id: 1, title: "Array Basics & Methods", duration: 2, practical: "push, pop, slice, splice" },
          { id: 2, title: "map / filter / reduce", duration: 3, practical: "Transform a dataset" },
          { id: 3, title: "Objects & Object Methods", duration: 2, practical: "Model a contact object" },
          { id: 4, title: "Destructuring & Spread", duration: 2, practical: "Refactor with destructuring" },
        ],
      },
      {
        id: 5,
        title: "The DOM",
        project: "To-Do List App",
        lessons: [
          { id: 1, title: "Selecting Elements", duration: 2, practical: "querySelector practice" },
          { id: 2, title: "Events & Event Listeners", duration: 2, practical: "Wire up a click handler" },
          { id: 3, title: "Creating & Removing Elements", duration: 2, practical: "Add/remove to-do items" },
          { id: 4, title: "Forms & Input Handling", duration: 2, practical: "Capture form submissions" },
        ],
      },
      {
        id: 6,
        title: "Async JavaScript",
        project: "Weather App (Fetch API)",
        lessons: [
          { id: 1, title: "Callbacks", duration: 2, practical: "Simulate async with setTimeout" },
          { id: 2, title: "Promises", duration: 2, practical: "Chain .then/.catch" },
          { id: 3, title: "Async/Await", duration: 2, practical: "Rewrite promises as async/await" },
          { id: 4, title: "Fetch API & JSON", duration: 3, practical: "Call a public API" },
          { id: 5, title: "Error Handling", duration: 2, practical: "Try/catch around network calls" },
        ],
      },
      {
        id: 7,
        title: "Modern JS & Modules",
        project: "Final JavaScript Project",
        lessons: [
          { id: 1, title: "ES Modules (import/export)", duration: 2, practical: "Split code into modules" },
          { id: 2, title: "Classes", duration: 2, practical: "Model data with a class" },
          { id: 3, title: "Local Storage", duration: 2, practical: "Persist data in the browser" },
          { id: 4, title: "Final JS Project", duration: 4, practical: "Ship a complete mini-app" },
        ],
      },
    ],
  },

  {
    id: "react",
    title: "React",
    instructor: "SuperSimpleDev",
    estimatedDays: 90,
    color: "#38bdf8",
    icon: "⚛️",
    modules: [
      {
        id: 1,
        title: "React Foundations",
        project: "Static Component Library",
        lessons: [
          { id: 1, title: "What is React & Why Components", duration: 2, practical: "Set up a React project" },
          { id: 2, title: "JSX Syntax", duration: 2, practical: "Convert HTML to JSX" },
          { id: 3, title: "Function Components", duration: 2, practical: "Build reusable UI pieces" },
          { id: 4, title: "Props", duration: 2, practical: "Pass data into components" },
        ],
      },
      {
        id: 2,
        title: "State & Interactivity",
        project: "Counter & Toggle Widgets",
        lessons: [
          { id: 1, title: "useState Hook", duration: 3, practical: "Build a counter" },
          { id: 2, title: "Event Handling in React", duration: 2, practical: "Handle clicks and input" },
          { id: 3, title: "Conditional Rendering", duration: 2, practical: "Show/hide UI conditionally" },
          { id: 4, title: "Lists & Keys", duration: 2, practical: "Render a dynamic list" },
        ],
      },
      {
        id: 3,
        title: "Effects & Lifecycle",
        project: "Data-Fetching Dashboard",
        lessons: [
          { id: 1, title: "useEffect Hook", duration: 3, practical: "Fetch data on mount" },
          { id: 2, title: "Cleanup Functions", duration: 2, practical: "Clear timers/subscriptions" },
          { id: 3, title: "Dependency Arrays", duration: 2, practical: "Control when effects re-run" },
        ],
      },
      {
        id: 4,
        title: "Forms & Refs",
        project: "Controlled Form App",
        lessons: [
          { id: 1, title: "Controlled Inputs", duration: 2, practical: "Build a sign-up form" },
          { id: 2, title: "Form Validation", duration: 2, practical: "Add validation rules" },
          { id: 3, title: "useRef Hook", duration: 2, practical: "Focus an input programmatically" },
        ],
      },
      {
        id: 5,
        title: "Routing & Structure",
        project: "Multi-Page App",
        lessons: [
          { id: 1, title: "React Router Basics", duration: 3, practical: "Set up routes" },
          { id: 2, title: "Nested Routes & Params", duration: 3, practical: "Build a detail page" },
          { id: 3, title: "Component Composition", duration: 2, practical: "Refactor into layout components" },
        ],
      },
      {
        id: 6,
        title: "State Management",
        project: "Shopping Cart App",
        lessons: [
          { id: 1, title: "Lifting State Up", duration: 2, practical: "Share state between siblings" },
          { id: 2, title: "Context API", duration: 3, practical: "Build a theme/cart context" },
          { id: 3, title: "useReducer", duration: 2, practical: "Manage complex state logic" },
        ],
      },
      {
        id: 7,
        title: "Final Project",
        project: "Full React Application",
        lessons: [
          { id: 1, title: "Connecting to a Real API", duration: 3, practical: "Fetch and display live data" },
          { id: 2, title: "Deployment", duration: 2, practical: "Deploy the app live" },
          { id: 3, title: "Final React Project", duration: 4, practical: "Ship a complete React app" },
        ],
      },
    ],
  },

  {
    id: "git",
    title: "Git & GitHub",
    instructor: "SuperSimpleDev",
    estimatedDays: 15,
    color: "#f97316",
    icon: "🌿",
    modules: [
      {
        id: 1,
        title: "Git Basics",
        project: "First Local Repo",
        lessons: [
          { id: 1, title: "What is Version Control", duration: 1, practical: "Install & configure Git" },
          { id: 2, title: "git init, add, commit", duration: 2, practical: "Make your first commits" },
          { id: 3, title: "git status & git log", duration: 1, practical: "Inspect repo history" },
          { id: 4, title: ".gitignore", duration: 1, practical: "Ignore build artifacts" },
        ],
      },
      {
        id: 2,
        title: "Branching & Merging",
        project: "Feature Branch Workflow",
        lessons: [
          { id: 1, title: "Creating & Switching Branches", duration: 2, practical: "Branch off for a feature" },
          { id: 2, title: "Merging Branches", duration: 2, practical: "Merge feature into main" },
          { id: 3, title: "Resolving Merge Conflicts", duration: 2, practical: "Resolve a conflict on purpose" },
        ],
      },
      {
        id: 3,
        title: "GitHub & Collaboration",
        project: "Open Source Contribution",
        lessons: [
          { id: 1, title: "Remotes: push & pull", duration: 2, practical: "Push a repo to GitHub" },
          { id: 2, title: "Pull Requests", duration: 2, practical: "Open a pull request" },
          { id: 3, title: "Forking & Cloning", duration: 1, practical: "Fork and clone a repo" },
          { id: 4, title: "Rebasing & Undoing Changes", duration: 2, practical: "Practice revert, reset, rebase" },
        ],
      },
    ],
  },

  {
    id: "node",
    title: "Node.js",
    instructor: "SuperSimpleDev",
    estimatedDays: 45,
    color: "#22c55e",
    icon: "🟢",
    modules: [
      {
        id: 1,
        title: "Node Fundamentals",
        project: "CLI File Tool",
        lessons: [
          { id: 1, title: "What is Node.js & the Event Loop", duration: 2, practical: "Run your first Node script" },
          { id: 2, title: "Modules (CommonJS & ESM)", duration: 2, practical: "Split code into modules" },
          { id: 3, title: "npm & package.json", duration: 2, practical: "Initialize a project & add deps" },
          { id: 4, title: "File System (fs) Module", duration: 2, practical: "Read/write files from a CLI tool" },
        ],
      },
      {
        id: 2,
        title: "Building Servers",
        project: "Basic HTTP Server",
        lessons: [
          { id: 1, title: "The http Module", duration: 2, practical: "Serve plain responses" },
          { id: 2, title: "Routing Requests", duration: 2, practical: "Handle multiple routes" },
          { id: 3, title: "Environment Variables", duration: 1, practical: "Configure via .env" },
        ],
      },
      {
        id: 3,
        title: "Async Patterns in Node",
        project: "File Processing Pipeline",
        lessons: [
          { id: 1, title: "Streams & Buffers", duration: 3, practical: "Process a large file with streams" },
          { id: 2, title: "Error-First Callbacks", duration: 1, practical: "Handle Node-style errors" },
          { id: 3, title: "Async/Await in Node", duration: 2, practical: "Refactor callbacks to async/await" },
        ],
      },
      {
        id: 4,
        title: "Packages & Tooling",
        project: "Production-Ready Script",
        lessons: [
          { id: 1, title: "Publishing an npm Package", duration: 2, practical: "Package a utility for reuse" },
          { id: 2, title: "Debugging Node Apps", duration: 2, practical: "Use the Node inspector" },
          { id: 3, title: "Testing with a Test Runner", duration: 2, practical: "Write basic unit tests" },
        ],
      },
    ],
  },

  {
    id: "express",
    title: "Express.js",
    instructor: "SuperSimpleDev",
    estimatedDays: 30,
    color: "#94a3b8",
    icon: "🚀",
    modules: [
      {
        id: 1,
        title: "Express Basics",
        project: "REST API Skeleton",
        lessons: [
          { id: 1, title: "Setting Up Express", duration: 1, practical: "Create your first Express server" },
          { id: 2, title: "Routing in Express", duration: 2, practical: "Build GET/POST routes" },
          { id: 3, title: "Middleware Basics", duration: 2, practical: "Write a logging middleware" },
          { id: 4, title: "Route Parameters & Query Strings", duration: 2, practical: "Handle dynamic routes" },
        ],
      },
      {
        id: 2,
        title: "Building a REST API",
        project: "Task Manager API",
        lessons: [
          { id: 1, title: "CRUD Endpoints", duration: 3, practical: "Build create/read/update/delete routes" },
          { id: 2, title: "Request Validation", duration: 2, practical: "Validate incoming JSON" },
          { id: 3, title: "Error Handling Middleware", duration: 2, practical: "Centralize error responses" },
        ],
      },
      {
        id: 3,
        title: "Auth & Production Concerns",
        project: "Authenticated API",
        lessons: [
          { id: 1, title: "Authentication (JWT/Sessions)", duration: 3, practical: "Protect routes with auth" },
          { id: 2, title: "CORS & Security Headers", duration: 2, practical: "Lock down cross-origin access" },
          { id: 3, title: "Connecting Express to a Database", duration: 3, practical: "Persist data via a DB layer" },
        ],
      },
    ],
  },

  {
    id: "mongodb",
    title: "MongoDB",
    instructor: "SuperSimpleDev",
    estimatedDays: 35,
    color: "#16a34a",
    icon: "🍃",
    modules: [
      {
        id: 1,
        title: "NoSQL & MongoDB Basics",
        project: "Local Database Setup",
        lessons: [
          { id: 1, title: "SQL vs NoSQL", duration: 1, practical: "Compare data models" },
          { id: 2, title: "Documents & Collections", duration: 2, practical: "Explore a sample database" },
          { id: 3, title: "CRUD in the Mongo Shell", duration: 3, practical: "Insert, find, update, delete docs" },
        ],
      },
      {
        id: 2,
        title: "Querying & Schema Design",
        project: "Query Playground",
        lessons: [
          { id: 1, title: "Query Operators", duration: 3, practical: "Filter with $gt, $in, $regex" },
          { id: 2, title: "Schema Design Patterns", duration: 2, practical: "Model a one-to-many relationship" },
          { id: 3, title: "Indexes", duration: 2, practical: "Add an index & measure the difference" },
        ],
      },
      {
        id: 3,
        title: "Mongoose & App Integration",
        project: "Connected Node App",
        lessons: [
          { id: 1, title: "Mongoose Schemas & Models", duration: 3, practical: "Define a Mongoose model" },
          { id: 2, title: "Validation in Mongoose", duration: 2, practical: "Add schema validation rules" },
          { id: 3, title: "Aggregation Pipeline", duration: 3, practical: "Build a basic aggregation query" },
        ],
      },
    ],
  },

  {
    id: "sql",
    title: "SQL",
    instructor: "SuperSimpleDev",
    estimatedDays: 25,
    color: "#3b82f6",
    icon: "🗄️",
    modules: [
      {
        id: 1,
        title: "SQL Fundamentals",
        project: "Basic Queries",
        lessons: [
          { id: 1, title: "Tables, Rows & Columns", duration: 1, practical: "Explore a sample schema" },
          { id: 2, title: "SELECT & WHERE", duration: 2, practical: "Filter rows with conditions" },
          { id: 3, title: "ORDER BY & LIMIT", duration: 1, practical: "Sort and paginate results" },
        ],
      },
      {
        id: 2,
        title: "Joins & Aggregation",
        project: "Multi-Table Reports",
        lessons: [
          { id: 1, title: "INNER & LEFT JOIN", duration: 3, practical: "Join two related tables" },
          { id: 2, title: "GROUP BY & Aggregates", duration: 2, practical: "Summarize data with COUNT/SUM/AVG" },
          { id: 3, title: "Subqueries", duration: 2, practical: "Nest a query inside another" },
        ],
      },
      {
        id: 3,
        title: "Schema Design & Writes",
        project: "Design Your Own Database",
        lessons: [
          { id: 1, title: "Primary & Foreign Keys", duration: 2, practical: "Design a normalized schema" },
          { id: 2, title: "INSERT, UPDATE, DELETE", duration: 2, practical: "Modify data safely" },
          { id: 3, title: "Transactions", duration: 2, practical: "Wrap writes in a transaction" },
        ],
      },
    ],
  },

  {
    id: "deployment",
    title: "Deployment",
    instructor: "SuperSimpleDev",
    estimatedDays: 20,
    color: "#a855f7",
    icon: "☁️",
    modules: [
      {
        id: 1,
        title: "Getting Apps Live",
        project: "Deployed Static Site",
        lessons: [
          { id: 1, title: "Domains, DNS & Hosting Basics", duration: 2, practical: "Point a domain at a host" },
          { id: 2, title: "Deploying a Front-End App", duration: 2, practical: "Ship a static site live" },
          { id: 3, title: "Environment Variables in Production", duration: 1, practical: "Configure prod secrets" },
        ],
      },
      {
        id: 2,
        title: "Deploying Full-Stack Apps",
        project: "Live Full-Stack Deployment",
        lessons: [
          { id: 1, title: "Deploying a Node/Express Server", duration: 3, practical: "Deploy an API to production" },
          { id: 2, title: "Connecting a Hosted Database", duration: 2, practical: "Point prod app at a cloud DB" },
          { id: 3, title: "CI/CD Basics", duration: 3, practical: "Set up an auto-deploy pipeline" },
        ],
      },
      {
        id: 3,
        title: "Containers & Monitoring",
        project: "Dockerized Deployment",
        lessons: [
          { id: 1, title: "Docker Basics", duration: 3, practical: "Containerize an app" },
          { id: 2, title: "Logging & Monitoring", duration: 2, practical: "Add basic uptime monitoring" },
        ],
      },
    ],
  }

];

export default learningPath;