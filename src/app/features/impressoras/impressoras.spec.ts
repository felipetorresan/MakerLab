import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Impressoras } from './impressoras';

describe('Impressoras', () => {
  let component: Impressoras;
  let fixture: ComponentFixture<Impressoras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Impressoras],
    }).compileComponents();

    fixture = TestBed.createComponent(Impressoras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
