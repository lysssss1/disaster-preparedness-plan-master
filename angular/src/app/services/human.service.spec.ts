import { TestBed, inject } from '@angular/core/testing';

import { HumanService } from './human.service';

describe('HumanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HumanService]
    });
  });

  it('should be created', inject([HumanService], (service: HumanService) => {
    expect(service).toBeTruthy();
  }));
});
