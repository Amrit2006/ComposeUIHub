import ComponentCard from '../ComponentCard';

export default function ComponentCardExample() {
  //todo: remove mock functionality
  const mockComponent = {
    title: "Material Button",
    description: "A beautiful Material Design button with ripple effects and elevation",
    category: "Buttons",
    difficulty: "Beginner" as const,
    previewCode: `@Composable
fun MaterialButton() {
    Button(
        onClick = { },
        modifier = Modifier.fillMaxWidth()
    ) {
        Text("Click Me")
    }
}`,
    fullCode: `@Composable
fun MaterialButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true
) {
    Button(
        onClick = onClick,
        modifier = modifier,
        enabled = enabled,
        elevation = ButtonDefaults.elevation(
            defaultElevation = 4.dp,
            pressedElevation = 8.dp
        )
    ) {
        Text(
            text = text,
            style = MaterialTheme.typography.button
        )
    }
}`,
    tags: ["Button", "Material", "Ripple"]
  };

  return (
    <div className="max-w-sm">
      <ComponentCard {...mockComponent} />
    </div>
  );
}