import { TestBed } from '@angular/core/testing';

import { DndDatabaseService } from './dnd-database.service';

describe('DndDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DndDatabaseService = TestBed.get(DndDatabaseService);
    expect(service).toBeTruthy();
  });
});
