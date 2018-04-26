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

import {AxiosRequestConfig, AxiosResponse} from 'axios';

import {HttpClient} from '../http/';
import {Image} from '../giphy/';

class GiphyAPI {
  constructor(private client: HttpClient) {}

  static get URL() {
    return {
      GIPHY: 'giphy/v1/gifs',
      PROXY: '/proxy',
      RANDOM: 'random',
    };
  }

  /**
   * Get a random GIF from Giphy.
   * @param tag GIF tag to limit randomness
   */
  public getGiphyRandom(tag: string): Promise<Image> {
    const config: AxiosRequestConfig = {
      data: {
        tag,
      },
      url: `${GiphyAPI.URL.PROXY}/${GiphyAPI.URL.GIPHY}/${GiphyAPI.URL.RANDOM}`,
    };

    return this.client.sendJSON(config).then((response: AxiosResponse) => response.data);
  }
}

export {GiphyAPI};
