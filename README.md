# DraggableComponent

DraggableComponent is a flexible React component and hook that allows you to make any element draggable. This package is designed to be easy to use and customizable, making it a great addition to any React project.

## Installation

To install DraggableComponent, use npm or yarn:

```bash
npm install draggable-component
```

or

```bash
yarn add draggable-component
```

## Usage

### Using the DraggableComponent

You can use the `DraggableComponent` to wrap any content you want to make draggable.

```typescript
import React from "react";
import { DraggableComponent } from "draggable-component";
import "draggable-component/lib/components/DraggableComponent.css";

const MyApp: React.FC = () => {
  return (
    <DraggableComponent initialPosition={{ x: 100, y: 100 }}>
      <button>Drag me!</button>
    </DraggableComponent>
  );
};

export default MyApp;
```

### Using the useDraggable Hook

If you prefer, you can use the `useDraggable` hook to add draggable functionality to any component.

```typescript
import React from "react";
import { useDraggable } from "draggable-component";

const MyCustomComponent: React.FC = () => {
  const { position, isDragging, elementRef, handleMouseDown } = useDraggable({
    initialPosition: { x: 50, y: 50 },
  });

  return (
    <div
      ref={elementRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "fixed",
        left: `\${position.x}px`,
        top: `\${position.y}px`,
      }}
    >
      Drag me around!
    </div>
  );
};

export default MyCustomComponent;
```

## Props

### DraggableComponent Props

- `initialPosition?: { x: number; y: number }`: The initial position of the component.
- `randomPosition?: boolean`: If true, the component will start at a random position on the screen.
- `showTooltip?: boolean`: If true, a tooltip will be shown when the component has not yet been moved.

## Future Plans

1. **Resizing Functionality**: Add the ability for users to resize the draggable component.
2. **Snap to Grid**: Implement a grid system where the component can snap to defined grid positions when dragged.
3. **Bounding Area**: Allow users to define a bounding area so that the component cannot be dragged outside of a specified region.
4. **Accessibility Improvements**: Enhance keyboard navigation and accessibility features for better usability.
5. **Mobile Optimization**: Improve touch interactions and support for mobile devices, ensuring smooth and responsive dragging on touchscreens.
6. **Customization Hooks**: Provide additional hooks for more granular control over drag-and-drop behavior, such as drag start, drag end, and drag update callbacks.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss any changes or improvements.

## License

This project is licensed under the MIT License.
`
