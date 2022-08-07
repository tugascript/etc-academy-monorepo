import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateLessonInput } from './create-lesson.input';

@InputType()
export class UpdateClassInput extends PartialType(CreateLessonInput) {
  @Field(() => Int)
  id: number;
}
