import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _cat: CategoryService,
    private _router: Router
  ) {}

  quizId = 0;
  quiz;
  categories;

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params.id;
    // alert(this.qId);
    this._quiz.getQuiz(this.quizId).subscribe(
      (data: any) => {
        this.quiz = data.data;
        console.log(this.quiz.data);
      },
      (error) => {
        console.log(error);
      }
    );

    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        alert('error in loading categories');
      }
    );
  }

  //update form submit
  public updateData() {
    //validatate
console.log(this.quizId);
    this._quiz.updateQuiz(this.quizId).subscribe(
      (data) => {
        Swal.fire('Success !!', 'quiz updated', 'success').then((e) => {
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error) => {
        Swal.fire('Error', 'error in updating quiz', 'error');
        console.log(error);
      }
    );
  }
}
