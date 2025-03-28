@extends('backend.main')

@section('content')
<div class="row">
    <div class="col-xl-10 offset-xl-1">
        <div class="card my_card">
            <div class="card-header bg-transparent">
                <a href="{{route('orderSuccessMessage')}}" class="card-title mb-0 d-inline-flex align-items-center create_title">
                    <i class=" ri-arrow-left-s-line mr-3 primary-icon"></i>
                    <span class="create_sub_title">Message အသစ်ဖန်တီးမည်</span>
                </a>
            </div><!-- end card header -->
            <div class="card-body">
                <div class="row d-flex justify-content-center">
                    <div class="col-xl-9">
                        <form method="POST" action="{{route('orderSuccessMessage.store')}}" id="category_create" enctype="multipart/form-data">
                            @csrf
                            <div class="mb-3">
                                <label for="" class="form-label mb-3">Message</label>
                                <textarea name="message"  class="form-control" id="" rows="3" placeholder="order successful message ....."></textarea>
                            </div>
                            <div class="text-end submit-m-btn">
                                <button type="submit" class="btn btn-primary submit-btn">Message အသစ်ပြုလုပ်မည် </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
