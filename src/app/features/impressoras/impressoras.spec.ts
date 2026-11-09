import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Impressoras } from './impressoras';

describe('Impressoras', () => {
  let component: Impressoras;
  let fixture: ComponentFixture<Impressoras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Impressoras],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(Impressoras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
