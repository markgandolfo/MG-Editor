'use strict';
const currentDirectory = __dirname;
import Note from '../../src/models/Note';


describe('.title', () => {
  it('truncates on the first line break', () => {
    const note = new Note({
      description: '# Welcome to MG-Writer\n\nMG-Writer is a simple, plain text editor. You can write using markdown and the notes will be saved locally in your browser.\n\nCreate new notes, edit and delete all from your browser.'
    });

    expect(note.title()).toEqual('Welcome to MG-Writer');
  });

  it('truncates after 116 characters', () => {
    const note = new Note({
      description: 'Whether it is Snapchat, Twitter, Facebook, Yelp or just a post to co-workers or business officials, the number of mo'
    });

    expect(note.title()).toEqual('Whether it is Snapchat, Twitter, Facebook, Yelp or just a post to co-workers or business officials, the number of mo');
  });

  it('wont truncate on a word, but will truncate on the first space after 116', () => {
    const note = new Note({
      description: 'Whether it is Snapchat, Twitter, Facebook, Yelp or just a post to co-workers or business officials, the number of moments hello'
    });

    expect(note.title()).toEqual('Whether it is Snapchat, Twitter, Facebook, Yelp or just a post to co-workers or business officials, the number of moments');
  });
});
