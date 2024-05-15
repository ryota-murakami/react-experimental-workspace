type Props = {
  name: string
  variant: 'default' | 'primary' | 'secondary'
  size: 'small' | 'medium' | 'large'
}

export const Tooltip: React.FC<Props> = (props) => {
  const { name, size } = props

  return <div>Tooltip</div>
}
