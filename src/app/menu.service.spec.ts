import { TestBed, getTestBed, inject } from '@angular/core/testing';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  let injector: TestBed,
      menuService: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService]
    });
    injector = getTestBed();
    menuService = injector.get(MenuService);
  });

  it('should be created', inject([MenuService], (service: MenuService) => {
    expect(service).toBeTruthy();
  }));


  describe('empty', () => {

    it('notifies with null', () => {
      const state = true;
      const spy = jasmine.createSpy('subscriber spy');
      const open = menuService.open;

      open.subscribe(spy);
      menuService.setState(state);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(state);
    });
  });

});
