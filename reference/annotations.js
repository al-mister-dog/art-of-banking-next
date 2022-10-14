const label = {
    // Background color of label, default below
    backgroundColor: 'rgba(0,0,0,0.8)',

    // Font family of text, inherits from global
    fontFamily: "sans-serif",

    // Font size of text, inherits from global
    fontSize: 12,

    // Font style of text, default below
    fontStyle: "bold",

    // Font color of text, default below
    fontColor: "#fff",

    // Padding of label to add left/right, default below
    xPadding: 6,

    // Padding of label to add top/bottom, default below
    yPadding: 6,

    // Radius of label rectangle, default below
    cornerRadius: 6,

    // Anchor position of label on line, can be one of: top, bottom, left, right, center. Default below.
    position: "center",

    // Adjustment along x-axis (left-right) of label relative to above number (can be negative)
    // For horizontal lines positioned left or right, negative values move
    // the label toward the edge, and positive values toward the center.
    xAdjust: 0,

    // Adjustment along y-axis (top-bottom) of label relative to above number (can be negative)
    // For vertical lines positioned top or bottom, negative values move
    // the label toward the edge, and positive values toward the center.
    yAdjust: 0,

    // Whether the label is enabled and should be displayed
    enabled: false,

    // Text to display in label - default is null
    content: "Test label"
}
