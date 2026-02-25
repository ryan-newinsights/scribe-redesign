export interface TechOverviewLayer {
  name: string;
  modules: string;
  description: string;
}

export interface CoreComponent {
  title: string;
  module: string;
  description: string;
  functions: { name: string; description: string }[];
}

export interface DataFlowPhase {
  phase: string;
  description: string;
  details: string[];
}

export interface ExtensibilityPoint {
  area: string;
  description: string;
}

export interface TechDependency {
  name: string;
  description: string;
}

export interface TechOverview {
  projectId: string;
  title: string;
  architectureSummary: string;
  layers: TechOverviewLayer[];
  coreComponents: CoreComponent[];
  dataFlow: DataFlowPhase[];
  extensibility: ExtensibilityPoint[];
  dependencies: TechDependency[];
}

export const mockTechOverviews: Record<string, TechOverview> = {
  "1": {
    projectId: "1",
    title: "Technical Deep Dive: Data Analytics & Visualization Platform",
    architectureSummary:
      'The system follows a Modular Layered Architecture designed for data-intensive web applications. It is structured to separate concerns between user interface, business logic, and data persistence. Given the component naming conventions (e.g., `session_parameters`, `sidebar`, `show_login_page`), the application is built using the Streamlit framework, following a reactive execution model.',
    layers: [
      {
        name: "Presentation Layer",
        modules: "src.components, src.authenticator",
        description:
          "Handles UI rendering, user input capture, and stateful session management.",
      },
      {
        name: "Logic Layer",
        modules: "src.components.aggregation, src.components.filter",
        description:
          'Contains the "brain" of the application, responsible for data transformation, statistical aggregation, and filtering logic.',
      },
      {
        name: "Data Access Layer (DAL)",
        modules: "src.readwrite",
        description:
          "Provides an abstraction over heterogeneous data sources, including local files (CSV) and cloud data warehouses (Snowflake).",
      },
      {
        name: "Cross-Cutting Concerns",
        modules: "src.log, src.authenticator",
        description:
          "Manages logging, authentication, and global configuration.",
      },
    ],
    coreComponents: [
      {
        title: "Authentication & Session Management",
        module: "src.authenticator",
        description: "Manages the application's security perimeter.",
        functions: [
          {
            name: "authenticate / show_login_page",
            description:
              "Implements the gatekeeping logic. Intercepts the application's execution flow to ensure a valid session exists before rendering downstream components.",
          },
          {
            name: "initialize_session_parameters",
            description:
              "A critical state-management function that sets up the global state (st.session_state) required for data persistence across re-runs.",
          },
        ],
      },
      {
        title: "Data Processing & Aggregation",
        module: "src.components.aggregation",
        description: "The analytical core of the system.",
        functions: [
          {
            name: "categorize_columns / get_field_category",
            description:
              "Automatically detects data types (categorical vs. numerical) to determine valid operations.",
          },
          {
            name: "perform_aggregation",
            description:
              "The engine that executes group-by operations and statistical summaries based on user-defined dimensions and metrics.",
          },
        ],
      },
      {
        title: "Filtering Engine",
        module: "src.components.filter & src.components.store_filter",
        description:
          "A sophisticated, persistent filtering mechanism.",
        functions: [
          {
            name: "apply_filterset",
            description:
              "Dynamically constructs query predicates to slice the primary DataFrames.",
          },
          {
            name: "save_filter_set / load_filters",
            description:
              'Provides a "Saved Views" feature, allowing users to persist complex filter configurations to a backend and reload them in future sessions.',
          },
        ],
      },
      {
        title: "Data Access Layer",
        module: "src.readwrite",
        description: "Abstracts the complexity of data retrieval.",
        functions: [
          {
            name: "get_snowflake_connection / query_snowflake",
            description:
              "Handle secure connectivity and execution of SQL queries against the Snowflake Data Cloud.",
          },
          {
            name: "load_catalogue / load_df",
            description:
              "Handle local or networked CSV interactions, providing a fallback or supplementary data source to the cloud warehouse.",
          },
        ],
      },
    ],
    dataFlow: [
      {
        phase: "Ingestion",
        description: "Raw data is fetched from Snowflake or CSV.",
        details: [
          "src.readwrite modules fetch raw data from Snowflake or CSV",
          "src.components.data_types.init_datatypes ensures the schema is correctly mapped (e.g., converting date strings to datetime objects)",
        ],
      },
      {
        phase: "Transformation",
        description:
          "User selects filters and optionally aggregates the data.",
        details: [
          "User selects filters via src.components.filter",
          "apply_filterset generates a subset of the data",
          "If aggregation is requested, perform_aggregation processes the filtered subset",
        ],
      },
      {
        phase: "Visualization",
        description:
          "Processed data is rendered as charts and tables.",
        details: [
          "Processed data is passed to src.components.plot.plot_data for graphical rendering",
          "Tabular data is formatted via src.components.display_df.format_cols and rendered to the UI",
        ],
      },
      {
        phase: "Export",
        description:
          "Users can download the current view as Excel.",
        details: [
          "src.components.download.df_to_excel serializes the current state of the filtered/aggregated data into a downloadable binary format",
        ],
      },
    ],
    extensibility: [
      {
        area: "Adding Data Sources",
        description:
          "New modules can be added to src.readwrite (e.g., src.readwrite.postgres or src.readwrite.s3) as long as they return a standard Pandas DataFrame.",
      },
      {
        area: "Custom Visualizations",
        description:
          "Developers can extend src.components.plot by adding new plotting functions that consume the standardized aggregated data produced by the aggregation engine.",
      },
      {
        area: "New UI Components",
        description:
          'The modular nature of src.components allows for the "plug-and-play" addition of new sidebar widgets or data displays without modifying the core data processing logic.',
      },
    ],
    dependencies: [
      { name: "Streamlit", description: "Primary framework for the UI and reactive execution model." },
      { name: "Pandas", description: "Internal data structure for all manipulations, filtering, and aggregations." },
      { name: "Snowflake Connector", description: "Facilitates high-performance data retrieval from the Snowflake warehouse." },
      { name: "Plotly / Matplotlib / Altair", description: "Used within the plot component for generating interactive visualizations." },
      { name: "Openpyxl / XlsxWriter", description: "Required by the download component for generating Excel workbooks." },
      { name: "Logging", description: "Standard Python logging library integrated via src.log.logger." },
    ],
  },
};
