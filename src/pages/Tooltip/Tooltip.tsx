type Props = {
  name: string
  variant: 'default' | 'primary' | 'secondary'
  size: 'small' | 'medium' | 'large'
}

export const Tooltip: React.FC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, size } = props

  return <div>Tooltip</div>
}
