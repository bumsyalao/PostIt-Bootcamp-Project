import { ADD_FLASH_MESSAGE } from './types';

const addFlashMessage = message => ({
  type: ADD_FLASH_MESSAGE,
  message
});

export default addFlashMessage;

