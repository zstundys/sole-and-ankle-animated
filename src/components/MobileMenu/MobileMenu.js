/* eslint-disable no-unused-vars */
import { DialogContent, DialogOverlay } from "@reach/dialog";
import styled from "styled-components/macro";

import { QUERIES, WEIGHTS } from "../../constants";

import Icon from "../Icon";
import UnstyledButton from "../UnstyledButton";
import VisuallyHidden from "../VisuallyHidden";

const MobileMenu = ({ isOpen, onDismiss }) => {
  return (
    <Overlay isOpen={isOpen} onDismiss={onDismiss}>
      <Content aria-label="Menu">
        <CloseButton onClick={onDismiss}>
          <Icon id="close" />
          <VisuallyHidden>Dismiss menu</VisuallyHidden>
        </CloseButton>
        <Filler />
        <Nav>
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/new">New&nbsp;Releases</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/women">Women</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </Nav>
        <Footer>
          <SubLink href="/terms">Terms and Conditions</SubLink>
          <SubLink href="/privacy">Privacy Policy</SubLink>
          <SubLink href="/contact">Contact Us</SubLink>
        </Footer>
      </Content>
    </Overlay>
  );
};

const Overlay = styled(DialogOverlay)`
  --backdrop-duration: 400ms;
  --card-duration: 400ms;
  --card-delay: calc(var(--backdrop-duration) * 0.6);
  --content-duration: 500ms;
  --content-delay: calc((var(--card-delay) + var(--card-duration)) * 0.6);

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-backdrop);
  display: flex;
  justify-content: flex-end;
  animation: fadeInBackground var(--backdrop-duration);

  @keyframes fadeInBackground {
    0% {
      background: transparent;
    }
  }
`;

const Content = styled(DialogContent)`
  background: white;
  width: 300px;
  height: 100%;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  animation: fadeIn var(--card-duration);

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
  }

  @media ${QUERIES.prefersMotion} {
    animation: slideIn var(--card-duration) var(--card-delay) backwards
      cubic-bezier(0.25, 0.19, 0.15, 1);

    @keyframes slideIn {
      0% {
        transform: translateX(100%);
      }
    }
  }
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 16px;
  animation: fadeIn var(--content-duration) var(--content-delay) backwards;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: fadeIn var(--content-duration) var(--content-delay) backwards;
`;

const NavLink = styled.a`
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const Filler = styled.div`
  flex: 1;
`;
const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
  animation: fadeIn var(--content-duration) var(--content-delay) backwards;
`;

const SubLink = styled.a`
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;
`;

export default MobileMenu;
