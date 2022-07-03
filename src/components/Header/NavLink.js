import styled from "styled-components";
import { QUERIES, WEIGHTS } from "../../constants";

export default function NavLink({ children, className, href }) {
  return (
    <Wrapper href={href} className={className}>
      <Regular>{children}</Regular>
      <Bold aria-hidden="true">{children}</Bold>
    </Wrapper>
  );
}

const Regular = styled.span`
  display: block;
`;

const Bold = styled.b`
  display: block;
  font-weight: ${WEIGHTS.bold};
  display: none;
`;

const Wrapper = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  overflow: hidden;
  user-select: none;

  &:first-of-type {
    color: var(--color-secondary);
  }

  @media ${QUERIES.prefersMotion} {
    --spacing: 0.4rem;
    --duration: 300ms;

    position: relative;
    transition: box-shadow var(--duration);
    border-radius: 0.25rem;
    padding: 0 var(--spacing);
    margin: 0 calc(var(--spacing) * -1);

    ${Regular} {
      position: absolute;
      transition: transform var(--duration);
      will-change: transform;
    }

    ${Bold} {
      display: block;
      transform: translateY(100%);
      transition: transform var(--duration);
      will-change: transform;
    }

    &:hover,
    &:focus-visible {
      transition-delay: 100ms;
      box-shadow: 4px 0 0 0 currentColor, -4px 0 0 0 currentColor;

      ${Regular}, ${Regular} {
        transform: translateY(-100%);
      }

      ${Bold}, ${Bold} {
        transform: translateY(0);
      }
    }
  }
`;
