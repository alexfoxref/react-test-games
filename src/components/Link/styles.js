export const styles = props => `
	color: ${props.theme.textColor.secondary};
	text-decoration: none;
	transition: all ease ${props.theme.animationTime / 1000}s;

	&.${props.theme.activeClassName} {
		color: ${props.theme.textColor.primary};
	}
`
