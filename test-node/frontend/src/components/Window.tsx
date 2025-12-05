import type { ComponentChildren, JSX } from "preact";

interface WindowProps {
  title: string;
  children?: ComponentChildren;
}

export const Window = ({ title, children }: WindowProps): JSX.Element => {
  return (
    <div class="window">
      <div class="window-header">
        <div class="window-buttons">
          <button class="window-button close" />
          <button class="window-button minimize" />
          <button class="window-button maximize" />
        </div>
        <span>{title}</span>
      </div>
      <div class="window-content">{children}</div>
    </div>
  );
};
