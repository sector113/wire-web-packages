/*
 * Wire
 * Copyright (C) 2018 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

/** @jsx jsx */
import {CSSObject, jsx} from '@emotion/react';
import Color from 'color';

import {COLOR} from '../Identity/colors';
import {defaultTransition} from '../Identity/motions';
import {Theme} from '../Layout';
import {filterProps} from '../util';
import {TextProps, filterTextProps, textStyle} from './Text';

export enum LinkVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export interface LinkProps<T = HTMLAnchorElement> extends TextProps<T> {
  variant?: LinkVariant;
}

export const linkStyle: <T>(theme: Theme, props: LinkProps<T>) => CSSObject = (
  theme,
  {variant = LinkVariant.SECONDARY, color = theme.general.color, ...props},
) => {
  const darker = 0.16;
  const hoverColor = color === COLOR.TEXT ? Color(color)?.mix(Color(COLOR.BLACK), darker).toString() : COLOR.BLACK;
  return {
    ...textStyle(theme, {color, ...props}),
    color: color,
    cursor: 'pointer',
    textDecoration: 'none',
    '&:visited, &:link, &:active': {
      color: color,
    },
    ...(variant === LinkVariant.PRIMARY && {
      '&:hover, &:visited:hover': {
        color: theme.general.primaryColor,
      },
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
    }),
    ...(variant === LinkVariant.SECONDARY && {
      bold: true,
      fontSize: '11px',
      textTransform: 'uppercase',
      transition: defaultTransition,
      '&:hover': {
        color: hoverColor,
      },
    }),
  };
};

export const filterLinkProps = (props: LinkProps) => filterProps(filterTextProps(props) as LinkProps, []);

export const Link = (props: LinkProps) => {
  return (
    <a css={(theme: Theme) => linkStyle(theme, props)} rel="noopener noreferrer" {...filterLinkProps(props)}>
      {props.children}
    </a>
  );
};
