export function adjustHitbox(sprite) {
  const visibleWidth = sprite.width * sprite.scaleX;
  const visibleHeight = sprite.height * sprite.scaleY;

  sprite.body.setSize(visibleWidth, visibleHeight);

  const offsetX = (sprite.width - visibleWidth) / 2;
  const offsetY = (sprite.height - visibleHeight) / 2;
  sprite.body.setOffset(offsetX, offsetY);
}
