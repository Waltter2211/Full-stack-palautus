interface HeaderProps {
  courseName: string
}

function Header({ courseName }: HeaderProps) {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  )
}

export default Header